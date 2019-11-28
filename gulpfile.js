
const gulp = require("gulp");
const fs = require("fs");
const exec = require("child_process").exec;
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const webserver = require("gulp-webserver");
const rev = require("gulp-rev");
const revCollector = require("gulp-rev-collector");
const {watch} = require("gulp");
const colors = require("colors/safe");
const workboxBuild = require("workbox-build");

gulp.task("clean", (cb) => {
	let path = "./dist";

	let del = (path) => {
		if(fs.existsSync(path)){
			let files = fs.readdirSync(path);

			files.forEach((file) => {
				let currentPath = path + "/" + file;

				if(fs.lstatSync(currentPath).isDirectory()){
					del(currentPath);
				}
				else{
					fs.unlinkSync(currentPath);
				}
			});

			fs.rmdirSync(path);
		}
	};

	del(path);
	cb();
});

gulp.task("copy", () => {
	return gulp.src("./src/**/*")
		.pipe(gulp.dest("./dist"));
});

gulp.task("webpack", (cb) => {
	let env = process.env.NODE_ENV;
	let command = "NODE_ENV='development' webpack --hide-modules --config webpack.config.js";

	if(env == "production"){
		command = "NODE_ENV='production' webpack --hide-modules --config webpack.prod.config.js";
	}

	exec(command, function(error, stdout, stderr){
		if(stdout){
			console.log(colors.green("\n" + stdout));

			cb();
		}
		else if(error){
			console.log(colors.red("\n" + error));

			cb();
		}
	});
});

gulp.task("scss", (cb) => {
	return gulp.src("./src/css/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./dist/css/"));
});


gulp.task("cssnano", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

    return gulp.src("./dist/css/main.css")
        .pipe(cssnano({
            browsers: ["last 2 versions"],
            zindex: false, // 關閉z-index 設定
            autoprefixer: false,
            discardUnused: false,
            reduceIdents: false
        }))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("imagemin", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

	return gulp.src("./dist/image/**/*.{jpg,png,svg,gif}")
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}), // gif無損轉換為漸進式。
			imagemin.jpegtran({progressive: true}), // jpg無損失轉換為漸進式
			imagemin.optipng({optimizationLevel: 4}),  // 設定png優化等級，共有0~7級
			imagemin.svgo({
				plugins: [
					{removeXMLProcInst: true}, // 刪除XML處理指令
					{removeEmptyAttrs: true}, // 刪除空的屬性
					{removeHiddenElems: true}, // 刪除隱藏的元素
					{removeEmptyText: true}, // 刪除空的文本元素
					{removeEmptyContainers: true}, // 刪除空的容器元素
					{removeUnusedNS: true}, // 刪除未使用的名稱空間聲明
					{removeUselessStrokeAndFill: true}, // 刪除無用stroke和fillattrs
					{cleanupIDs: true} // 刪除未使用的和縮小使用的ID
				]
			})
		], {verbose: false}))
		.pipe(gulp.dest("./dist/image"))
});

gulp.task("minify", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

	return gulp.src("./src/*.html")
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest("./dist"));
});

gulp.task("rev-image", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

	let sources = new Array();

	sources.push("./dist/image/**/*.{jpg,png,svg,gif,ico}");

	return gulp.src(sources, {base: "./dist"})
		.pipe(rev())
		.pipe(gulp.dest("./dist"))
		.pipe(rev.manifest("rev-manifest.json"))
		.pipe(gulp.dest("./dist/rev"))
});

gulp.task("rev-collector-css-js", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

	let sources = new Array();

	sources.push("./dist/rev/rev-manifest.json");
	sources.push("./dist/css/main.css");
	sources.push("./dist/js/main.js");

	return gulp.src(sources, {base: "./dist"})
		.pipe(revCollector())
		.pipe(gulp.dest("./dist"));
});

gulp.task("rev-css-js", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

	let sources = new Array();

	sources.push("./dist/js/main.js");
	sources.push("./dist/css/main.css");

	return gulp.src(sources, {base: "./dist"})
		.pipe(rev())
		.pipe(gulp.dest("./dist"))
		.pipe(rev.manifest("./dist/rev/rev-manifest.json", {
			base: "./dist/rev",
			merge: true
		}))
		.pipe(gulp.dest("./dist/rev"))
});

gulp.task("rev-collector-html", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

	let sources = new Array();

	sources.push("./dist/rev/rev-manifest.json");
	sources.push("./dist/index.html");

	return gulp.src(sources, {base: "./dist"})
		.pipe(revCollector())
		.pipe(gulp.dest("./dist"));
});

gulp.task("service-worker", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		cb();

		return;
	}

    return workboxBuild.injectManifest({
        swSrc: "./src/service-worker.js",
        swDest: "./dist/service-worker.js",
        globDirectory: "dist",
        globPatterns: [
            "**/main\-*.{js,css}",
            "**/*\-*.{jpg,png}",
            "index.html",
            "manifest.json"
        ]
    }).then(({count, size, warnings}) => {
        warnings.forEach(console.warn);
        console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
});

gulp.task("watch", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "development"){
		let watcher = watch(["./src/**/*"], {
			events: "all"
		}, gulp.series("clean", "copy", "webpack", "scss"));

		watcher.on("all", (path, stats) => {
			console.log(colors.yellow("watch on " + path + " " + stats));
		});
	}

    cb();
});

gulp.task("webserver", (cb) => {
	let env = process.env.NODE_ENV;

	if(env == "production"){
		cb();

		return;
	}

    return gulp.src("./dist").pipe(webserver({
        port: 8888,
		https: false
    }));
});

gulp.task("default", gulp.series("clean", "copy", "webpack", "imagemin", "scss", "cssnano", "rev-image", "minify", "rev-collector-css-js", "rev-css-js", "rev-collector-html", "service-worker", "watch", "webserver"));
