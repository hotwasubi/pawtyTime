module.exports = function(sequelize, DataTypes) {
    var Appt = sequelize.define("Appt", {
        walkDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeSlot: {
            type: DataTypes.TIME,
            allowNull: false
        },
        dogUser:{
            type: DataTypes.INT,
            allowNull: false,
            default: 0
        },
        indexes: [
            {
                fields: ["walkDate", "timeSlot"]
            }
        ]
    });

    Appt.associate = function(models){
        Appt.belongsTo(models.Dog); //DogId
        Appt.belongsTo(models.DogActor); //DogActorId
    };
    return Appt;
}
