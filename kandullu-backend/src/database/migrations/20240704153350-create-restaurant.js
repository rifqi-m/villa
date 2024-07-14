module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("restaurants", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            about: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            menu: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            timings: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            gallery: {
                type: Sequelize.JSON,
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
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("restaurants");
    },
};
