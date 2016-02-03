/**
 * grunt 自动化构建
 * @param grunt
 */
// 1. wrapper函数，你的所有Grunt代码都必须写在这个函数里面
module.exports = function(grunt) {

    // 2. 项目和任务配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                //定义一个用于插入合并输出文件之间的字符
                separator: '\n'
            },
            dist: {
                //用于连接的文件
                src: ['src/*.js'],
                //返回的JS文件位置
                dest: 'release/<%= pkg.name %>.js'
            }
        },
        jshint: {
            //定义用于检测的文件
            files: ['gruntfile.js', 'src/*.js']
        },
        uglify: {
            options: {
                //生成一个banner注释并插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'release/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    // 3. 加载各种任务所需的插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 4. 自定义任务
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('concat', ['concat', 'uglify']);
};