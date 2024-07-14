import Sequelize, { Model } from "sequelize";

class FAQ extends Model {
    static init(sequelize) {
        super.init(
            {
                question: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                answer: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                tableName: "faqs",
            }
        );
        return this;
    }

    static associate(models) {
        // Define any associations here if needed
    }
}

export default FAQ;
