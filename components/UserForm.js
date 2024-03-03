'use client';

export default function UserForm({type, link, router}) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.nom_salarie.value;
    const password = event.target.mot_de_passe.value;

    const response = await fetch(link, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom_salarie: username, mot_de_passe: password })
    });

    if (response.ok) {
      await router.push('/projects');
    }
    else {
      alert("Veuillez réessayer")
    }
  };

  return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="/assets/favicon.png" className="h-24 mx-auto" alt="Logo" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              ProjeqSter : {type}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nom d'utilisateur
                </label>
                <div className="mt-2">
                  <input
                      id="nom_salarie"
                      name="nom_salarie"
                      type="name"
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Mot de passe
                  </label>

                </div>
                <div className="mt-2">
                  <input
                      id="mot_de_passe"
                      name="mot_de_passe"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-neutral-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 mb-4"
                >
                    {type}
                </button>
              </div>
            </form>


          </div>
        </div>
      </>
  )
}