import Sequelize, { Model } from "sequelize";

class NewsLetter extends Model {
    static init(sequelize) {
        super.init(
            {
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {   
                sequelize,
                tableName: "newsLetter",
                underscored: true,
            }
        );

        return this;
    }

    static associate(models) {
        // Define any associations here if needed
    }
}

export default NewsLetter;
