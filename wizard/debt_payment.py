# -*- coding:utf-8 -*-

from openerp import models, fields, api,exceptions


class pos_customer_debt_payment(models.TransientModel):
    _name = 'pos.customer.debt.payment'
    
    def get_partner(self):
        brow = self.env['res.partner'].browse(self._context.get('partner',False))
        return brow



    cash_amount = fields.Float('Amount to cash')
    amount = fields.Float('Amount Total',compute='get_amount')
    partner = fields.Many2one('res.partner',default=get_partner,string="Customer")


    @api.one
    @api.depends('partner')
    def get_amount(self):
        self.amount = self.partner.debt


    @api.multi

    def change_customer_debt(self):
        self.partner.debt -= self.cash_amount



wizard_reglement_customer()
