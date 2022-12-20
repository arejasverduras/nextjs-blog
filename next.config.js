module.exports = {
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: { mode: ['react-component'] }
            }
        )
        return cfg;
    },
    generateBuildId: () =>'build-id',
    images: {
        loader: 'custom',
        loaderFile: './my/image/loader.js',
      },
}