import Sequelize, { Model } from "sequelize";

class News extends Model {
    static init(sequelize) {
        super.init(
            {
              user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users", // table name of your User model
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            subtitle: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            main_image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            },
            {
                sequelize,
                tableName: "news",
                timestamps: true,
                underscored: true,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
}

export default News;
