module.exports = {
    array: process.env.TOP_LEVEL_ENTRY.split(","),

    object: {
       datasets: process.env.DATASETS,
       persons: process.env.PERSONS,
       exhibitions: process.env.PERSONS,
    }
}