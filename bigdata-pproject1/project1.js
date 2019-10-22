// Divisions
db.divisions.insert({
  name: "Operations"
})
db.divisions.insert({
  name: "Loan"
})
db.divisions.insert({
  name: "Deposit"
})

// Emplyees
db.emplyees.insert({
  fname: "Ivan",
  lname: "Dzheferov",
  sname: "S",
  address: "236, Bulgaria blvd, Plovdiv",
  cellphone: "0892345678",
  email: "ivand@mail.bg",
  position: "developer",
  boss: "",
  salary: 40000,
  divisions: [
    {
      division_id: "",
      beginDate: new Date("2006-11-12"),
      endDate: new Date("2019-01-01")
    },
    {
      division_id: "",
      beginDate: new Date("2019-01-01")
    },

  ],
  birthCountry: "Bulgaria",
  mother: true
})

// Clients
db.clients.insert({
  fname: "Ivan",
  lname: "Dzheferov",
  sname: "S",
  address: "236, Bulgaria blvd, Plovdiv",
  cellphone: "0892345678",
  email: "ivand@mail.bg",
  accounts: [
    {
      name: "BG50UNCR300037737",
      currency: "BGN",
      balance: 1200
    }
  ]
})