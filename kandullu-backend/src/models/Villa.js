import Sequelize, { Model } from "sequelize";

class Villa extends Model {
    static init(sequelize) {
        super.init(
            {
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                about: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                facilities: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                room_rates: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                is_rented: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                rent_start: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                rent_end: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                gallery: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                booking_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: "bookings",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
                baths: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                beds: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                max_guest: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                summary: {
                    type: Sequelize.STRING(150),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true, // If you want createdAt and updatedAt columns
                underscored: true, // For snake_case columns
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Booking, { foreignKey: "booking_id" });
    }
}

export default Villa;
