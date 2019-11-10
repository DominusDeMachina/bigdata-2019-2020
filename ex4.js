let dbw_trucks = {
    insert: function (document) {
        if (!document.model) {
            print('Property *model* is required');
            return;
        }
        if (!document.nomer) {
            print('Property *nomer* is required')
            return;
        }
        if (document.getOwnPropertyNames().length > 2) {
            print('Only *model* and *nomer* property allowed')
        }
        db.trucks.insert(document);
    },
    create: function () {
        db.trucks.drop()

        db.createCollection("trucks")
    },
    list: function () {
        return db.trucks.aggregate([
            {
                $lookup: {
                    from: 'cargo',
                    localField: '_id',
                    foreignField: 'truckNumber',
                    as: 'c'
                }
            },
            {
                $unwind: '$c'
            },
            {
                $project: {
                    'model': 1,
                    'nomer': 1,
                    'cargo': '$c.name',
                    'qty': '$c.qty'
                }
            }
        ])
    }
};

dbw_trucks.create()

dbw_trucks.insert({
    model: "Mazda",
    nomer: "23423423424"
})

dbw_trucks.insert({
    model: "BMW",
    nomer: "3456345345"
})

dbw_trucks.insert({
    model: "Man",
    nomer: "356734563453"
})


dbw_trucks.insert(
    {
        model: "Kanaz",
        nomer: "1235676777"
    }
)

dbw_trucks.insert(
    {
        model: "Volvo",
        nomer: "975734563453"
    }
)

db.trucks.find().forEach(element => {
    db.trucks.update({ _id: element._id }, {
        $set: {
            minSeats: 2
        }
    })
});

let dbw_priorityCargo = {
    insert: function (document, nomer) {
        if (!document.name) {
            print('Property *name* is required');
            return;
        }
        if (!document.category) {
            print('Property *category* is required')
            return;
        }
        if (!document.qty) {
            print('Property *qty* is required')
            return;
        }
        if (!nomer) {
            print('Nomer is required')
            return;
        }
        let truck = db.trucks.find({ nomer: nomer });
        if (!truck) {
            print('Wrong nomer')
        }
        document.truckNumber = truck[0]._id
        db.priorityCargo.insert(document);
    },
    create: function () {
        db.priorityCargo.drop()
        db.createCollection('priorityCargo')
    }
};

let dbw_cargo = {
    priorityCargo = ['fruits', 'vegetables', 'meat', 'milk', 'dairy'],
    insert: function (document, nomer) {
        if (!document.name) {
            print('Property *name* is required');
            return;
        }
        if (!document.category) {
            print('Property *category* is required')
            return;
        }
        if (!document.qty) {
            print('Property *qty* is required')
            return;
        }
        if (!nomer) {
            print('Nomer is required')
            return;
        }
        let truck = db.trucks.find({ nomer: nomer });
        if (!truck) {
            print('Wrong nomer')
        }
        document.truckNumber = truck[0]._id;

        db.cargo.insert(document);

        if (this.priorityCargo.includes(document.category)){
            dbw_priorityCargo.insert(document)
        }
    },
    create: function () {
        db.cargo.drop()
        db.createCollection('cargo')
    }
};