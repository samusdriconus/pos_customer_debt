openerp.pos_customer_debt = function (instance) {

    var QWeb = instance.web.qweb,
        _t = instance.web._t;

    instance.point_of_sale.PaymentScreenWidget.include({
    	is_paid:function(){
    		var currentOrder = this.pos.get('selectedOrder');
    		if (currentOrder.get_client() == null)
    			 {
    			 	return this._super()
    			 }
            return currentOrder.getPaidTotal() >= 0;
    	},

    	apply_debt : function(){
    		 var currentOrder = this.pos.get('selectedOrder');
    		 if (currentOrder.getTotalTaxIncluded() - currentOrder.getPaidTotal() > 0){
    		 	return true;
    		 }
    		 return false

    	},

    	validate_order: function(options){
    			var currentOrder = this.pos.get('selectedOrder');
    			var client = currentOrder.get_client();
    			if (client == null){
    				 	return this._super(options);
    				 }
    			if (this.apply_debt()){
    				var debt_value = currentOrder.getTotalTaxIncluded() - currentOrder.getPaidTotal()
    				res_partner = new instance.web.Model("res.partner")
					res_partner.call("apply_debt",[client.id,debt_value] ,{ context: new instance.web.CompoundContext() });
    			}

    		
    			return this._super(options);
    	}




    });
}