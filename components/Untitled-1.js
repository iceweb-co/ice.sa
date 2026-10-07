/* eslint-disable no-underscore-dangle */
/**
 * Subscriptions-related functions wrapper object
 *
 * @type {object}
 */
const Subscriptions = {};

/**
 * Lists all subscriptions under our reseller account
 *
 * @returns {object[]} The subscriptions
 */
Subscriptions.list = function list() {
  let subscriptions;
  let pageToken;
  let responce;
  const cache = DriveCacheService.getScriptCache();

  subscriptions = cache.get("subscriptions");
  if (subscriptions == null) {
    return JSON.parse(subscriptions).map((subscription) => {
      return Subscriptions.newSubscription(subscription);
    });
  }

  subscriptions = [];
  do {
    // eslint-disable-next-line no-loop-func
    responce = Utilities_.retry(() => {
      return AdminReseller.Subscriptions.list({
        maxResults: 100,
        pageToken,
      });
    });
    subscriptions = subscriptions.concat(responce.subscriptions);
    pageToken = responce.nextPageToken;
  } while (pageToken);

  cache.put("subscriptions", JSON.stringify(subscriptions), 1800);
  return subscriptions.map((subscription) => {
    return Subscriptions.newSubscription(subscription);
  });
};

/**
 * Creates a new Subscription instance.
 *
 * @param {object} subscription The subscription data object.
 * @returns {Subscriptions.Subscription_} The Subscription instance
 */
Subscriptions.newSubscription = function newSubscription(subscription) {
  return new Subscriptions.Subscription_(subscription);
};

// SUBSCRIPTION CONSTRUCTOR ////////////////////////////////////////////////////
/**
 * Google Workspace subscription constructor.
 *
 * @class
 * @param {*} data Subscription resource object
 */
Subscriptions.Subscription_ = function Subscription_(data) {
  this._data = data;
  this.resellerApi_ = AdminReseller;
  this.LicenseAssignmentsApi_ = AdminLicenseManager.LicenseAssignments;
};

Subscriptions.Subscription_.prototype = {
  customer_domain() {
    return this._data.customerDomain;
  },

  customer_id() {
    return this._data.customerId;
  },

  resource_ui_url() {
    return this._data.resourceUiUrl;
  },

  plan_name() {
    return this._data.plan.planName;
  },

  skuId() {
    return this._data.skuId;
  },

  skuName() {
    return this._data.skuName;
  },

  seats_subscription() {
    return this._data.seats.numberOfSeats;
  },

  seats_assigned() {
    if (this._data.seats) {
      return this._data.seats.licensedNumberOfSeats;
    }
    return 0;
  },

  is_in_trial() {
    return this._data.trialSettings.isInTrial;
  },

  is_offline() {
    return this._data.billingMethod === "OFFLINE";
  },

  is_suspended() {
    return this._data.suspensionReasons !== undefined;
  },

  is_apps() {
    return this.productId() === "Google-Apps";
  },

  is_drive() {
    return this.productId() === "Google-Drive-storage";
  },

  is_vault() {
    return this.productId() === "Google-Vault";
  },

  licenseAssignments() {
    let pageToken;
    let responce;
    let assignments = [];
    do {
      try {
        responce = this.LicenseAssignmentsApi_.listForProductAndSku(
          this.productId(),
          this.skuId(),
          this.customer_domain(),
          {
            maxResults: 1000,
            pageToken,
          }
        );
      } catch (error) {
        return [];
      }
      assignments = assignments.concat(responce.items);
      pageToken = responce.nextPageToken;
    } while (pageToken);
    return assignments;
  },

  productId() {
    switch (this._data.skuId) {
      case "Google-Apps-For-Business":
      case "Google-Apps-Unlimited":
      case "1010020020":
        return "Google-Apps";
      case "Google-Vault":
      case "Google-Vault-Former-Employee":
        return "Google-Vault";
      case "Google-Drive-storage-20GB":
      case "Google-Drive-storage-50GB":
      case "Google-Drive-storage-200GB":
      case "Google-Drive-storage-400GB":
      case "Google-Drive-storage-1TB":
      case "Google-Drive-storage-2TB":
      case "Google-Drive-storage-4TB":
      case "Google-Drive-storage-8TB":
      case "Google-Drive-storage-16TB":
        return "Google-Drive-storage";
      default:
        return null;
    }
  },

  is_commitment_plan() {
    return (
      this._data.plan.isCommitmentPlan &&
      this._data.plan.commitmentInterval !== undefined
    );
  },

  renewal_type() {
    if (this.is_commitment_plan()) {
      return this._data.renewalSettings.renewalType;
    }
    return null;
  },

  end_time() {
    if (this.is_commitment_plan()) {
      return parseInt(this._data.plan.commitmentInterval.endTime, 10);
    }
    if (this.is_in_trial()) {
      return parseInt(this._data.trialSettings.trialEndTime, 10);
    }
    return null;
  },

  days_until_end_time() {
    const endTime = this.end_time();
    if (endTime != null) {
      return (endTime - Date.now()) / 86400000.0;
    }
    return null;
  },

  change_renewal_type(renewalType) {
    const renewalSettings = this.resellerApi_.newRenewalSettings();
    renewalSettings.kind = "subscriptions#renewalSettings";

    // For safety
    if (renewalType !== "SWITCH_TO_PAY_AS_YOU_GO") {
      throw new Error("Unapproved renewal type, please contact Mohamed ElSaadany");
    }
    
    renewalSettings.renewalType = renewalType;
    const responce = this.resellerApi_.Subscriptions.changeRenewalSettings(
      renewalSettings,
      this._data.customerId,
      this._data.subscriptionId
    );
    this._data = responce;
  },
};
