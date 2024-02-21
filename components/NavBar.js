import React from 'react';

const Navbar = ({host}) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-shrink-0 mr-6">
                    <img src="/assets/favicon.png" className="h-8" alt="Logo" />
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="hidden lg:block">
                    <ul className="flex space-x-4">
                        <li>
                            <a href={host + "/account/login"} className="text-white hover:text-gray-300">Se connecter</a>
                        </li>
                        <li>
                            <a href={host + "/account/signin"} className="text-white hover:text-gray-300">S'inscrire</a>
                        </li>
                        <li>
                            <a href={host + "/projects"} className="text-white hover:text-gray-300">Mes projets</a>
                        </li>
                        <li>
                            <a href={host + "/projects/new"} className="text-white hover:text-gray-300">Nouveau projet</a>
                        </li>

                        <li>
                            <a href={host + "/account/profile"} className="text-white hover:text-gray-300">Mon profil</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
