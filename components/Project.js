'use client';
import dotenv from "dotenv";

dotenv.config();

export default function Project({ project, users }) {
    let { id_projet, nom_projet, description, chef_de_projet } = project;
    for (let user of users) {
        if (user.id_salarie === chef_de_projet) {
            chef_de_projet = user.nom_salarie;
        }
    }
    return (
            <article key={id_projet} className="flex max-w-xl flex-col items-start justify-between border border-gray-300 p-4 rounded-lg">
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={project.datetime} className="text-gray-500">
                        {project.date}
                    </time>
                </div>
                <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={process.env.NEXT_PUBLIC_API_HOST + '/projects/' + id_projet}>
                            <span className="absolute inset-0" />
                            {nom_projet}
                        </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                            <span className="absolute inset-0" />
                            {chef_de_projet}
                        </p>
                    </div>
                </div>
            </article>
        
    );
}