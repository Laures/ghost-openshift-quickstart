ghost-openshift-quickstart
==========================

Quickstart for Openshift to start a new Blog running on Ghost

Ghost is a free, open, simple blogging platform that's available to anyone who wants to use it. Lovingly created and maintained by [John O'Nolan](http://twitter.com/JohnONolan) + [Hannah Wolfe](http://twitter.com/ErisDS) + an amazing group of [contributors](https://github.com/TryGhost/Ghost/contributors).

Visit the project's website at [http://ghost.org](http://ghost.org)!

This quickstart allows to run Ghost on Redhats Platform-as-a-Service [Openshift Online](https://www.openshift.com/products/online "Openshift Online")

##Get an Account

If you don’t already have an OpenShift account, head on over to the website and signup. It is completely free and Red Hat gives every user three free Gears on which to run your applications.

This client requires a command shell with a working `git` command and the OpenShift Client tools. These tools, known as `rhc` are built and packaged using the Ruby programming language. They allow you to manage your gears and applications from the commandline. The installation of these tools is explained [here](https://www.openshift.com/developers/rhc-client-tools-install).

##Creating your Gear

For Ghost you will require a nodejs-0.10 gear with installed MySQL. You can easily set this up with rhc by doing:

    rhc app create %appname% nodejs-0.10
    rhc cartridge add mysql-5.1 -a %appname%

Here %appname% is a name choosen by you for your new blog. rhc will have created your app now and cloned the git repository into a subfolder named `%appname%`.

##Adding the Quickstart

The last thing you need to do is add the code of this repository to yours.

    cd %appname%
    git remote add upstream -m master git@github.com:Laures/ghost-openshift-quickstart.git 
    git pull -s recursive -X theirs upstream master
    git push

Congratulation. With this push openshift will start your Ghost blog automaticly and store all your entries in the MySQL database.

##Accessing your blog

You can access your blog by visiting the URL of your gear (`%appname%-%namespace%.rhcloud.com`). 

##Changes done to Ghost

To get ghost to run on openshift, some changes had to be done to the project:

###Initial Configuration

Openshift offers configuration helpers and also expects hosted applications in certain ways. Because of that ghost is by default configured with the help of environment variables provided by openshift.

Pre-set values contain:

- the blog url
- ip and port of the http listener (required by openshift)
- connection to the MySQL database (required by openshift)

###Application Entry Point

Openshift expects the entry-point into a node application to be the server.js so the original index.js was renamed accordingly.
