module.exports = function(sequelize, DataTypes) {
    var Appt = sequelize.define("Appt", {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dogwalkerId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
                fields: ["dogwalkerId", "walkDate", "timeSlot"]
            }
        ]
    });

    Appt.associate = function(models){
        Appt.belongsTo(models.Dog),
        Appt.belongsTo(models.dogactor)
    };
    return Appt;
}
