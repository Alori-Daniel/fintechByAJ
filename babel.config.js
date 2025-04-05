module.exports = function (api) {
    api.cache(true);
    return {
        preset: ['babel-preset-expo'],
        plugins: ['react-native-reanimated/plugin']
    }
}