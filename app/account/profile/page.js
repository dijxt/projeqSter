// 'use server';
//
// import fetchUsers from "@/lib/fetchUsers";
// import { getCookie } from 'cookies-next';
//
// export default function Profile() {
//     let nom = '';
//     const id_salarie = getCookie('id_salarie');
//
//     const users = fetchUsers();
//     const user = users.find((user) => user.id_salarie === id_salarie);
//     if (user) {
//         nom = user.nom_salarie;
//     }
//
//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="border-2 border-gray-300 p-6 rounded-md shadow-lg bg-white">
//                 <h3 className="text-base font-semibold leading-7 text-gray-900 text-center mb-4">Mon Compte </h3>
//                 <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 text-center mb-4">Informations personnelles</p>
//                 <dl className="divide-y divide-gray-100">
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className="text-sm font-medium leading-6 text-gray-900">Identifiant</dt>
//                         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{id_salarie} </dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className="text-sm font-medium leading-6 text-gray-900">Nom</dt>
//                         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{nom}</dd>
//                     </div>
//                 </dl>
//             </div>
//         </div>
//     )
// }