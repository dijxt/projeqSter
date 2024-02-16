'use client';

export default function Project({ project, users }) {
    let { id_projet, nom_projet, description, chef_de_projet } = project;
    for (let user of users) {
        if (user.id_salarie === chef_de_projet) {
            chef_de_projet = user.nom_salarie;
        }
    }
    return (
        <div key={id_projet} className="bg-blue-500 h-24 w-24 flex items-center justify-center text-white font-bold">
            <div className="p-4 bg-white rounded shadow-lg">
                <h2 className="text-2xl text-gray-900 font-bold mb-2">{nom_projet}</h2>
                <p className="text-gray-700">{description}</p>
                <p className="text-sm text-gray-500 mt-4">Chef de projet: {chef_de_projet}</p>
            </div>
        </div>
    );
}