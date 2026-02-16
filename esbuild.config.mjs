import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
    entryPoints: ['src/styles/style.scss', 'src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'dist',
    format: 'cjs',
    external: ['react', 'react-dom'],
    plugins: [sassPlugin()],
};

if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('Watching for changes...');
} else {
    await esbuild.build(buildOptions);
    console.log('Build complete.');
}
