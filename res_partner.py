# -*- coding:utf-8 -*-

from openerp import models, fields, api,exceptions

class res_partner(models.Model):
	_inherit = "res.partner"
	debt = fields.Float("Debt")


	@api.model
	def apply_debt(self,id,debt_value):
		res = self.browse(id)
		res.debt_sale += debt_value
		return True

res_partner()

