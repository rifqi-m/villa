import Sequelize, { Model } from "sequelize";

class Booking extends Model {
    static init(sequelize) {
        super.init(
            {
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
                property_id: Sequelize.INTEGER,
                payment_id: {
                  type: Sequelize.STRING,
                  allowNull: true
                },
                payment_type: {
                    type: Sequelize.ENUM,
                    values: ["half_payment", "full_payment"],
                },
                amount: Sequelize.DECIMAL,
                pending_amount: Sequelize.DECIMAL,
                user_id: Sequelize.INTEGER,
                guests: Sequelize.JSON,
                is_paid_partially: Sequelize.BOOLEAN,
                is_paid: Sequelize.BOOLEAN,

            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                tableName: "bookings",
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "User" });
        this.belongsTo(models.Villa, { foreignKey: "property_id", as: "Villa" });
    }
}

export default Booking;
