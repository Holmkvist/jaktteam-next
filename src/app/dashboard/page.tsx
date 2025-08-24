import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronRightIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const statuses = {
  offline: 'text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-100/10',
  online:
    'text-green-500 bg-green-500/10 dark:text-green-400 dark:bg-green-400/10',
  error: 'text-rose-500 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-400/10',
};
const environments = {
  Preview:
    'text-gray-500 bg-gray-50 ring-gray-200 dark:text-gray-400 dark:bg-gray-400/10 dark:ring-gray-400/20',
  Production:
    'text-indigo-500 bg-indigo-50 ring-indigo-200 dark:text-indigo-400 dark:bg-indigo-400/10 dark:ring-indigo-400/30',
};
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 2,
    href: '#',
    projectName: 'mobile-api',
    teamName: 'Planetaria',
    status: 'online',
    statusText: 'Deployed 3m ago',
    description: 'Deploys from GitHub',
    environment: 'Production',
  },
  {
    id: 3,
    href: '#',
    projectName: 'tailwindcss.com',
    teamName: 'Tailwind Labs',
    status: 'offline',
    statusText: 'Deployed 3h ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 4,
    href: '#',
    projectName: 'company-website',
    teamName: 'Tailwind Labs',
    status: 'online',
    statusText: 'Deployed 1d ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 5,
    href: '#',
    projectName: 'relay-service',
    teamName: 'Protocol',
    status: 'online',
    statusText: 'Deployed 1d ago',
    description: 'Deploys from GitHub',
    environment: 'Production',
  },
  {
    id: 6,
    href: '#',
    projectName: 'android-app',
    teamName: 'Planetaria',
    status: 'online',
    statusText: 'Deployed 5d ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 7,
    href: '#',
    projectName: 'api.protocol.chat',
    teamName: 'Protocol',
    status: 'error',
    statusText: 'Failed to deploy 6d ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 8,
    href: '#',
    projectName: 'planetaria.tech',
    teamName: 'Planetaria',
    status: 'online',
    statusText: 'Deployed 6d ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
];
const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'mobile-api',
    commit: '249df660',
    branch: 'main',
    date: '3h',
    dateTime: '2023-01-23T09:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '11464223',
    branch: 'main',
    date: '12h',
    dateTime: '2023-01-23T00:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'company-website',
    commit: 'dad28e95',
    branch: 'main',
    date: '2d',
    dateTime: '2023-01-21T13:00',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'relay-service',
    commit: '624bc94c',
    branch: 'main',
    date: '5d',
    dateTime: '2023-01-18T12:34',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'api.protocol.chat',
    commit: 'e111f80e',
    branch: 'main',
    date: '1w',
    dateTime: '2023-01-16T15:54',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'api.protocol.chat',
    commit: '5e136005',
    branch: 'main',
    date: '1w',
    dateTime: '2023-01-16T11:31',
  },
  {
    user: {
      name: 'Whitney Francis',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '5c1fd07f',
    branch: 'main',
    date: '2w',
    dateTime: '2023-01-09T08:45',
  },
];

export default function Overview() {
  return (
    <>
      <main className="">
        <header className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 dark:border-white/5">
          <h1 className="text-base/7 font-semibold text-gray-900 dark:text-white">
            Deployments
          </h1>

          {/* Sort dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-x-1 text-sm/6 font-medium text-gray-900 dark:text-white">
              Sort by
              <ChevronUpDownIcon
                aria-hidden="true"
                className="size-5 text-gray-500"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                >
                  Name
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                >
                  Date updated
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                >
                  Environment
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </header>

        {/* Deployment list */}
        <ul
          role="list"
          className="divide-y divide-gray-100 dark:divide-white/5"
        >
          {deployments.map((deployment) => (
            <li
              key={deployment.id}
              className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
            >
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <div
                    className={clsx(
                      // statuses[deployment.status],
                      'flex-none rounded-full p-1',
                    )}
                  >
                    <div className="size-2 rounded-full bg-current" />
                  </div>
                  <h2 className="min-w-0 text-sm/6 font-semibold text-gray-900 dark:text-white">
                    <a href={deployment.href} className="flex gap-x-2">
                      <span className="truncate">{deployment.teamName}</span>
                      <span className="text-gray-400">/</span>
                      <span className="whitespace-nowrap">
                        {deployment.projectName}
                      </span>
                      <span className="absolute inset-0" />
                    </a>
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs/5 text-gray-500 dark:text-gray-400">
                  <p className="truncate">{deployment.description}</p>
                  <svg
                    viewBox="0 0 2 2"
                    className="size-0.5 flex-none fill-gray-300 dark:fill-gray-500"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <p className="whitespace-nowrap">{deployment.statusText}</p>
                </div>
              </div>
              <div
                className={clsx(
                  // environments[deployment.environment],
                  'flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {deployment.environment}
              </div>
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </li>
          ))}
        </ul>
      </main>

      {/* Activity feed */}
      {/*<aside className="bg-gray-50 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-gray-200 dark:bg-black/10 dark:lg:border-white/5">*/}
      {/*  <header className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 dark:border-white/5">*/}
      {/*    <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">*/}
      {/*      Activity feed*/}
      {/*    </h2>*/}
      {/*    <a*/}
      {/*      href="#"*/}
      {/*      className="text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400"*/}
      {/*    >*/}
      {/*      View all*/}
      {/*    </a>*/}
      {/*  </header>*/}
      {/*  <ul*/}
      {/*    role="list"*/}
      {/*    className="divide-y divide-gray-100 dark:divide-white/5"*/}
      {/*  >*/}
      {/*    {activityItems.map((item) => (*/}
      {/*      <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">*/}
      {/*        <div className="flex items-center gap-x-3">*/}
      {/*          <img*/}
      {/*            alt=""*/}
      {/*            src={item.user.imageUrl}*/}
      {/*            className="size-6 flex-none rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"*/}
      {/*          />*/}
      {/*          <h3 className="flex-auto truncate text-sm/6 font-semibold text-gray-900 dark:text-white">*/}
      {/*            {item.user.name}*/}
      {/*          </h3>*/}
      {/*          <time*/}
      {/*            dateTime={item.dateTime}*/}
      {/*            className="flex-none text-xs text-gray-500 dark:text-gray-600"*/}
      {/*          >*/}
      {/*            {item.date}*/}
      {/*          </time>*/}
      {/*        </div>*/}
      {/*        <p className="mt-3 truncate text-sm text-gray-500">*/}
      {/*          Pushed to{' '}*/}
      {/*          <span className="text-gray-700 dark:text-gray-400">*/}
      {/*            {item.projectName}*/}
      {/*          </span>{' '}*/}
      {/*          (*/}
      {/*          <span className="font-mono text-gray-700 dark:text-gray-400">*/}
      {/*            {item.commit}*/}
      {/*          </span>{' '}*/}
      {/*          on{' '}*/}
      {/*          <span className="text-gray-700 dark:text-gray-400">*/}
      {/*            {item.branch}*/}
      {/*          </span>*/}
      {/*          )*/}
      {/*        </p>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</aside>*/}
    </>
  );
}
