'use client';
export default function Projects ({data}) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            {data.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {data.map(project => (
                        <div
                            key={project.id_projet}
                            className={`bg-blue-500 h-24 w-24 flex items-center justify-center text-white font-bold`}
                        >
                            {project.nom_projet}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-black-500">Vous n'avez aucun projet</p>
            )}
        </div>
    );
};


