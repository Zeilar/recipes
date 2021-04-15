const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findOrFail(id) {
    try {
        const recipe = await prisma.recipe.findUnique({ where: { id } });
        if (recipe === null) {
            return { code: 404 };
        }
        return { recipe, code: 200 };
    } catch (e) {
        return { code: 500 };
    }
}

async function getRecipes(req, res) {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                ingredients: true,
                steps: true,
            },
        });
        return res.json(recipes);
    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
}

async function getRecipeById(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        return res.sendStatus(400);
    }
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
            include: {
                ingredients: true,
                steps: true,
            },
        });
        if (!recipe) {
            return res.sendStatus(404);
        }
        return res.json(recipe);
    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
}

async function createRecipe(req, res) {
    const { recipe, steps, ingredients } = req.body;
    if (!recipe || !steps || !ingredients) {
        return res.sendStatus(400);
    }
    try {
        await prisma.recipe.create({
            data: {
                ...recipe,
                ingredients: { create: ingredients },
                steps: { create: steps },
            },
        });
        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
}

async function updateRecipe(req, res) {
    const id = Number(req.params.id);
    const { recipe, steps, ingredients } = req.body;

    if (!id || !recipe || !steps || !ingredients) {
        return res.sendStatus(400);
    }
    
    const { code } = await findOrFail(id);
    if (code !== 200) {
        return res.sendStatus(code);
    }

    try {
        await prisma.recipe.update({
            where: { id },
            data: {
                ingredients: {
                    deleteMany: {},
                    create: ingredients,
                },
                steps: {
                    deleteMany: {},
                    create: steps,
                },
            },
        });
        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
}

async function deleteRecipe(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        return res.sendStatus(400);
    }

    const { code } = await findOrFail(id);
    if (code !== 200) {
        return res.sendStatus(code);
    }

    try {
        const recipe = await prisma.recipe.findUnique({ where: { id } });
        if (recipe === null) {
            return res.sendStatus(404);
        }
        await prisma.recipe.delete({ where: { id } });
        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
}

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
};
