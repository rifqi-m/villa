import Sequelize, { Model } from "sequelize";

class ContactUs extends Model {
    static init(sequelize) {
        super.init(
            {
                full_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                phone_no: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                message: {
                    type: Sequelize.TEXT,
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
        // Define any associations here if needed
    }
}

export default ContactUs;
