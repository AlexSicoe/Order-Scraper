const OrderType = Object.freeze({
  Neconfirmata: 'comanda_neconfirmata',
  Confirmata: 'comanda_confirmata',
  Expediata: 'comanda_expediata',
  Finalizata: 'comanda_finalizata',
  Anulata: 'comanda_anulata',
  InAsteptare: 'in_asteptare',
  Returnata: 'comanda_returnata'
})

module.exports = OrderType
