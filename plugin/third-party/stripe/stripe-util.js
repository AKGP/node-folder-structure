'use strict';
/**
 * ******  IMPORTNAT NOTICE  *********
 * For all callback first argument is error and 
 * second argument is data retrived from stripe.
 */


/**
 * creates utility functions for handling stripe requests
 * @class
 * @param {string} stripeApiKey    api key of stripe
 */
function StripeUtil(stripeApiKey) {
    this.stripe = require('stripe')(stripeApiKey);
    this.stripe.setApiVersion('2016-07-06');
}
/**
 * Charge From a Card
 * @this   StripeUtil
 * @param {Object} config             An object which contains all the required infos
 * @param  {String} config.stripeToken        The token you get after saving the card at stripe
 * @param  {Number} config.amount           Amount to deduct (in cent)
 * @param  {Number} config.description        description related to charge
 * @param  {requestCallback} callback         The callback that handles the response. 
 */
StripeUtil.prototype.chargeCard = function(config, callback) {

    var charge = this.stripe.charges.create({
        amount: config.amount, // amount in cents, again
        currency: "usd",
        source: config.stripeToken,
        customer: config.customer,
        description: config.description
    }, callback);
};

StripeUtil.prototype.refund = function(config, callback) {

    this.stripe.charges.createRefund(
        config.charge_id, {
            amount: config.amount

        }, callback);
};

/**
 * Add a Plan
 * @this   StripeUtil
 * @param  {Object} config                  An object which contains all the required data
 * @param  {Number} config.amount         Price of the plan, should be in cent
 * @param  {string} config.name         Name of the plan.
 * @param  {string} config.id           Id of the plan. Should be unique.
 * @param  {string} config.interval       Interval of the plan (expected values: "month","year")
 * @param  {Number} config.interval_count     Number of interval, By default 1 
 * @param {string} config.statement_descriptor An arbitrary string to be displayed on your customer’s credit card statement. This may be up to 22 characters. As an example, if your website is RunClub and the item you’re charging for is your Silver Plan, you may want to specify a statement_descriptor of RunClub Silver Plan. The statement description may not include <>"' characters, and will appear on your customer’s statement in capital letters. Non-ASCII characters are automatically stripped. While most banks display this information consistently, some may display it incorrectly or not at all.
 * @param  {requestCallback} callback         The callback that handles the response.
 */
StripeUtil.prototype.createPlan = function(config, callback) {

    if (!config.interval_count) {
        config.interval_count = 1
    }
    this.stripe.plans.create(config, callback);
};

/**
 * Update a Plan
 * @this   StripeUtil
 * @param  {Object} config                  An object which contains all the required data
 * @param  {string} config.name         Name of the plan.
 * @param  {string} config.id           Id of the plan
 * @param  {string} config.metadata         A set of key/value pairs that you can attach to a plan object. It can be useful for storing additional information about the plan in a structured format. This can be unset by updating the value to null and then saving.
 * @param {string} config.statement_descriptor An arbitrary string to be displayed on your customer’s credit card statement. This may be up to 22 characters. As an example, if your website is RunClub and the item you’re charging for is your Silver Plan, you may want to specify a statement_descriptor of RunClub Silver Plan. The statement description may not include <>"' characters, and will appear on your customer’s statement in capital letters. Non-ASCII characters are automatically stripped. While most banks display this information consistently, some may display it incorrectly or not at all.
 * @param  {requestCallback} callback         The callback that handles the response.
 */

StripeUtil.prototype.updatePlan = function(config, callback) {

    var id = config.id;
    delete config.id;
    this.stripe.plans.create(id, config, callback);
};

/**
 * Delete a Plan
 * @this   StripeUtil
 * @param  {string} id                Id of the plan
 * @param  {requestCallback} callback           The callback that handles the response.
 */

StripeUtil.prototype.deletePlan = function(id, callback) {

    this.stripe.plans.del(id, callback);
};

/**
 * Get a Plan
 * @this   StripeUtil
 * @param  {string} id                Id of the plan
 * @param  {requestCallback} callback           The callback that handles the response.
 */

StripeUtil.prototype.getPlan = function(id, callback) {

    this.stripe.plans.retrieve(id, callback);
};

/**
 * Get list of Plans
 * @this   StripeUtil
 * @param  {number} limit             A limit on the number of objects to be returned. Limit can range between 1 and 100 items. default is 10
 * @param  {requestCallback} callback           The callback that handles the response.
 */

StripeUtil.prototype.getPlans = function(limit, callback) {

    this.stripe.plans.list({
        limit: limit
    }, callback);
};

/**
 * Create a customer
 * @this   StripeUtil
 * @param  {Object} config                  An object which contains all the required data
 * @param  {string} config.source           The token you get after saving the card at stripe
 * @param  {string} config.id           Id of the selected plan, If you want to create a customer only then omit this field.
 * @param  {string} config.email          Valid email where the invoice will be sent.
 * @param  {requestCallback} callback         The callback that handles the response.
 * @description There are a lot of fields you can add in config. For details please visit "https://stripe.com/docs/api#create_customer"
 */
StripeUtil.prototype.createCustomer = function(config, callback) {

    this.stripe.customers.create(config, callback);
};

/**
 * Get customer
 * @param {String} customerId           Id of a specific customer
 * @param  {requestCallback} callback         The callback that handles the response.
 */

StripeUtil.prototype.getCustomer = function(customerId, callback) {
    this.stripe.customers.retrieve(customerId, callback);
};

/**
 * Update a customer
 * @param {Object} config                   An object which contains all the required data
 * @param {String} config.customer_id         Id of the customer
 * @param {Number} config.account_balance       account balance of the user
 * @param {String} config.coupon          coupon id, customer will get the discount from next charges depends on the coupon
 * @param {String} config.default_source      Id of a source of that customer
 * @param {String} config.description         description
 * @param {String} config.email           email
 * @param  {requestCallback} callback             The callback that handles the response.
 */

StripeUtil.prototype.updateCustomer = function(config, callback) {
    var customerId = config.customer_id;
    delete config.customer_id;
    this.stripe.customers.update(customerId, config, callback);
};

/**
 * Remove a Customer
 * @param {string} customerId             Id of a customer
 * @param {requestCallback} callback            The callback that handles the response.
 */

StripeUtil.prototype.removeCustomer = function(customerId, callback) {
    this.stripe.customers.del(customerId, callback);
};
/**
 * Get current balance
 * @param  {requestCallback} callback         The callback that handles the response.
 */

StripeUtil.prototype.getBalance = function(callback) {
    this.stripe.balance.retrieve(callback);
}

/**
 * Retrieve a transaction
 * @param  {string} transactionId         id of a transaction
 * @param  {requestCallback} callback         The callback that handles the response.
 */

StripeUtil.prototype.retrieveTransaction = function(transactionId, callback) {
    stripe.balance.retrieveTransaction(transactionId, callback);
};

/**
 * Get Tansaction List
 * @param  {Object}          config       Pass a query object as defined here: https://stripe.com/docs/api#balance_history
 * @param  {requestCallback} callback         The callback that handles the response.
 */

StripeUtil.prototype.getTransactionList = function(config, callback) {
    this.stripe.balance.listTransactions(config, callback);
}

/**
 * Get Charge Object
 * @param  {string}          chagreId       Id of a charge
 * @param  {requestCallback} callback         The callback that handles the response.
 */

StripeUtil.prototype.retrieveCharge = function(chargeId, callback) {
    this.stripe.charges.retrieve(chargeId, callback);
}

/**
 * Get Charge List
 * @param  {Object}          config       Pass a query object as defined here: https://stripe.com/docs/api#list_charges
 * @param  {requestCallback} callback         The callback that handles the response.
 */

StripeUtil.prototype.getChargeList = function(config, callback) {
    this.stripe.charges.list(config, callback);
}

/**
 * Create Card/Bank Account Token
 * @description Send either card or bank_account in config
 * @param {Object} config                     details of card or account
 * @param {object} config.card                  details of card
 * @param {string} config.card.number               card number
 * @param {number} config.card.exp_month            expiration month of the card(MM)
 * @param {number} config.card.exp_year             expirattion year of the card(YYYY)
 * @param {string} config.card.cvc                CVC of the card
 * @param {object} config.bank_account              details of bank account
 * @param {String} config.bank_account.country          value of country
 * @param {String} config.bank_account.currency         value of currency
 * @param {String} config.bank_account.name           value of name
 * @param {String} config.bank_account.account_holder_type    value of account_holder_type
 * @param {String} config.bank_account.routing_number       value of routing_number
 * @param {String} config.bank_account.account_number       value of account_number
 * @param  {requestCallback} callback                   The callback that handles the response.
 */

StripeUtil.prototype.createToken = function(config, callback) {
    this.stripe.tokens.create(config, callback);
};

/**
 * Retieve a Token object
 * @param {string} token        token id 
 * @param {requestCallback} callback    The callback that handles the response.
 */

StripeUtil.prototype.retrieveToken = function(token, callback) {
    this.stripe.tokens.retrieve(token, callback);
};

/**
 * Create a transfer
 * @param {object} config             An object which contains all the required data
 * @param {number} config.amount        amount to transfer in cent
 * @param {string} config.currency        check availibility of currency. Better to use "usd" for simplicity
 * @param {string} config.destination       The id of a bank account or a card to send the transfer to, or the string "default_for_currency" to use the default external account for the specified currency
 * @param {string} config.description       description for transfer
 * @param {string} config.source_type       Valid options are "card", "alipay_account", "bitcoin_receiver".
 */

StripeUtil.prototype.createTransfer = function(config, callback) {
    this.stripe.transfers.create(config, callback);
};


/**
 * Retieve a Transfer object
 * @param {string} token        transfer id 
 * @param {requestCallback} callback    The callback that handles the response.
 */

StripeUtil.prototype.retrieveToken = function(token, callback) {
    this.stripe.transfers.retrieve(token, callback);
};

/**
 * Update a transfer
 * @param {Object} config                   An object which contains all the required data
 * @param {String} config.transfer_id         Id of the transfer
 * @param {String} config.description         description
 * @param {String} config.metadata          metadata
 * @param  {requestCallback} callback             The callback that handles the response.
 */

StripeUtil.prototype.updateTransfer = function(config, callback) {
    var id = config.transfer_id;
    delete config.transfer_id;
    this.stripe.transfers.update(id, config, callback);
};


/**
 * Get Transfer List
 * @param {Object}  config              Pass a query object as defined here: https://stripe.com/docs/api#list_transfers
 * @param {requestCallback} callback    The callback that handles the response.
 */

StripeUtil.prototype.getTransferList = function(config, callback) {
    this.stripe.transfers.list(config, callback);
}


/**
 * Create a coupon
 * @description A coupon has either a percent_off or an amount_off and currency. If you set an amount_off, that amount will be subtracted from any invoice’s subtotal. For example, an invoice with a subtotal of $10 will have a final total of $0 if a coupon with an amount_off of 2000 is applied to it and an invoice with a subtotal of $30 will have a final total of $10 if a coupon with an amount_off of 2000 is applied to it.
 * @param {Object} config An object which contains all the required data
 * @param {string} config.id Unique string of your choice that will be used to identify this coupon when applying it to a customer. This is often a specific code you’ll give to your customer to use when signing up (e.g. FALL25OFF). If you don’t want to specify a particular code, you can leave the ID blank and we’ll generate a random code for you.
 * @param {string} config.duration Specifies how long the discount will be in effect. Can be forever, once, or repeating.
 * @param {string} config.amount_off A positive integer representing the amount to subtract from an invoice total (required if percent_off is not passed)
 * @param {string} config.currency Currency of the amount_off parameter (required if amount_off is passed)
 * @param {string} config.duration_in_months Required only if duration is repeating, in which case it must be a positive integer that specifies the number of months the discount will be in effect.
 * @param {string} config.max_redemptions A positive integer specifying the number of times the coupon can be redeemed before it’s no longer valid. For example, you might have a 50% off coupon that the first 20 readers of your blog can use.
 * @param {string} config.metadata A set of key/value pairs that you can attach to a coupon object. It can be useful for storing additional information about the coupon in a structured format. This can be unset by updating the value to null and then saving.
 * @param {string} config.percent_off A positive integer between 1 and 100 that represents the discount the coupon will apply (required if amount_off is not passed)
 * @param {string} config.redeem_by Unix timestamp specifying the last time at which the coupon can be redeemed. After the redeem_by date, the coupon can no longer be applied to new customers.
 * @param {requestCallback} callback    The callback that handles the response.
 */

StripeUtil.prototype.createCoupon = function(config, callback) {
    this.stripe.coupons.create(config, callback);
};


/**
 * Retieve a Coupon object
 * @param {string} token        coupon id 
 * @param {requestCallback} callback    The callback that handles the response.
 */

StripeUtil.prototype.retrieveCoupon = function(token, callback) {
    this.stripe.coupons.retrieve(token, callback);
};

/**
 * Get Coupon List
 * @param {Object}  config              Pass a query object as defined here: https://stripe.com/docs/api#list_coupons
 * @param {requestCallback} callback    The callback that handles the response.
 */

StripeUtil.prototype.getCouponList = function(config, callback) {
    this.stripe.coupons.list(config, callback);
}

/**
 * Delete coupon
 * @param {string} id coupon id
 */

StripeUtil.prototype.deleteCoupon = function(id) {
    this.stripe.coupons.del(id);
};

/**
 * Edit a coupon
 * @param {Object} config                   An object which contains all the required data
 * @param {String} config.id            Id of the coupon
 * @param {String} config.metadata          metadata
 * @param  {requestCallback} callback             The callback that handles the response.
 */

StripeUtil.prototype.updateCoupon = function(config, callback) {
    var id = config.id;
    delete config.id;

    this.stripe.coupons.update(id, config, callback);
};

/**
 * Delete a customer discount
 * @param {string} customerId         Id of the customer
 * @param {requestCallback} callback        The callback that handles the response.
 */

StripeUtil.prototype.removeDiscount = function(customerId, callback) {
    this.stripe.customers.deleteDiscount(customerId, callback);
};

/**
 * Create a subscription
 * @param {object} config object with all required field
 * @param {number} config.application_fee_percent A positive decimal (with at most two decimal places) between 1 and 100. This represents the percentage of the subscription invoice subtotal that will be transferred to the application owner’s Stripe account. The request must be made with an OAuth key in order to set an application fee percentage.
 * @param {string} config.coupon The code of the coupon to apply to this subscription. A coupon applied to a subscription will only affect invoices created for that particular subscription.
 * @param {string} config.plan The identifier of the plan to subscribe the customer to.
 * @param {string} config.source The source can either be a token, like the ones returned by our Stripe.js, or a object containing a user's credit card details (with the options shown below). You must provide a source if the customer does not already have a valid source attached, and you are subscribing the customer for a plan that is not free. Passing source will create a new source object, make it the customer default source, and delete the old customer default if one exists.
 * @param {number} config.quantity The quantity you'd like to apply to the subscription you're creating. For example, if your plan is $10/user/month, and your customer has 5 users, you could pass 5 as the quantity to have the customer charged $50 (5 x $10) monthly. If you update a subscription but don't change the plan ID (e.g. changing only the trial_end), the subscription will inherit the old subscription's quantity attribute unless you pass a new quantity parameter. If you update a subscription and change the plan ID, the new subscription will not inherit the quantity attribute and will default to 1 unless you pass a quantity parameter.
 * @param {String} config.customer_id  customer Id
 * @param {requestCallback} callback        The callback that handles the response.
 */

StripeUtil.prototype.createSubscription = function(config, callback) {
    var id;
    if (!config && config.customer_id) {
        new callback('customer id required');
    } else {
        id = config.customer_id;
        delete config.customer_id;
    }

    this.stripe.customers.createSubscription(id, config, callback);
};

/**
 * Retrieve a subscription
 * @param {string} customer_id ID of the customer
 * @param {string} subscription_id ID of subscription to retrieve.
 * @param {requestCallback} callback        The callback that handles the response.
 */

StripeUtil.prototype.retrieveSubscription = function(customer_id, subscription_id, callback) {
    this.stripe.customers.retrieveSubscription(customer_id, subscription_id, callback);
};

/**
 * Update a subscription
 * @param {string} customer_id ID of the customer
 * @param {string} subscription_id ID of subscription to retrieve.
 * @param {object} config Fields to update. Check the available fields at "https://stripe.com/docs/api#update_subscription"
 * @param {requestCallback} callback        The callback that handles the response.
 */

StripeUtil.prototype.updateSubscription = function(customer_id, subscription_id, config, callback) {
    this.stripe.customers.updateSubscription(customer_id, subscription_id, config, callback);
};

/**
 * Cancel a subscription
 * @param {string} customer_id ID of the customer
 * @param {string} subscription_id ID of subscription to retrieve.
 * @param {requestCallback} callback        The callback that handles the response.
 */

StripeUtil.prototype.cancelSubscription = function(customer_id, subscription_id, config, callback) {
    this.stripe.customers.cancelSubscription(customer_id, subscription_id, config, callback);
};

/**
 * Get active subscriptions of a customer
 * @param {string} customer_id ID of the customer
 * @param {requestCallback} callback        The callback that handles the response.
 */

StripeUtil.prototype.listSubscriptions = function(customer_id, callback) {
    this.stripe.customers.listSubscriptions(customer_id, callback);
};
/**
 *  Add a card for the customer
 * @param {string} config of the customer
 * @param {requestCallback} callback        The callback that handles the response.
 */
StripeUtil.prototype.createCard = function(customer_Id, config, callback) {
    this.stripe.customers.createSource(customer_Id, config, callback);
};
/**
 *  Create a account managed account
 * @param {Object} config of the customer
 * @param {requestCallback} callback        The callback that handles the response.
 */
StripeUtil.prototype.createAccount = function(config, callback) {
    this.stripe.accounts.create(config, callback);
};

StripeUtil.prototype.editExternalAccount = function(accountId, bankAccountId, config, callback) {
    this.stripe.accounts.updateExternalAccount(accountId, bankAccountId, config, callback);
};



StripeUtil.prototype.addExternalAccount = function(accountId, config, callback) {
    this.stripe.accounts.createExternalAccount(accountId, config, callback);
};

StripeUtil.prototype.getAccount = function(accountId, callback) {
    this.stripe.accounts.retrieve(accountId, callback);
};

StripeUtil.prototype.transferAmount = function(config, callback) {
    this.stripe.transfers.create(config, callback);
};
/**
 * Exporting StripeUtil instance with all the methods
 * @param  {string} stripeApiKey api key given by stripe
 * @return {Object}              Instance of StripeUtil constructor.
 */
module.exports = function(stripeApiKey) {
    return new StripeUtil(stripeApiKey);
};
