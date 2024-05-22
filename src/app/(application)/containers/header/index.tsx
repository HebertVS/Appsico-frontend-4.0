import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from '@/components/ui/logout';
import masked from '@/libraries/masked';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import authOptions from '@/services/auth';
import {
  LucideCloud,
  LucideCreditCard,
  LucideGithub,
  LucideKeyboard,
  LucideLifeBuoy,
  LucideMail,
  LucideMessageSquare,
  LucidePlus,
  LucidePlusCircle,
  LucideSettings,
  LucideUser2,
  LucideUserPlus2,
  LucideUsers2,
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import StickyScroll from './sticky';

const routers = [
  {
    name: 'Profissionais',
    pathname: '/profissional',
  },
];

export default async function Header() {
  const session = (await getServerSession(authOptions))?.user;

  return (
    <StickyScroll>
      <header className='w-full'>
        <div className='mx-auto flex h-20 items-center gap-8'>
          <Link href='/'>
            <h1 className='text-primary font-extrabold text-4xl'>
              App<span className='font-light'>sico</span>
            </h1>
          </Link>
          <div className='flex flex-1 items-center justify-end md:justify-between'>
            <nav aria-label='Global' className='hidden md:block'>
              <ul className='flex items-center gap-6 text-sm'>
                {routers.map((item) => (
                  <li key={item.pathname}>
                    <Link
                      className='text-gray-500 transition hover:text-gray-500/75'
                      href={item.pathname}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {session && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className='flex flex-row items-center justify-end gap-3 hover:bg-slate-50 rounded p-2'>
                    <div className='text-right items-end justify-end flex flex-col'>
                      <span className='block text-sm text-gray-900 font-semibold truncate max-md:max-w-[130px] text-right items-end'>
                        {masked.name(session.name)}
                      </span>
                      <span className='block text-xs text-gray-500 font-light truncate max-md:max-w-[150px] text-right items-end'>
                        {session.email}
                      </span>
                    </div>
                    <Image
                      src={PLACEHOLDER}
                      width={512}
                      height={512}
                      alt='img-profile'
                      className='w-12 h-12 rounded-full'
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} className='w-56'>
                  <DropdownMenuGroup>
                    <Link href='/perfil'>
                      <DropdownMenuItem>
                        <LucideUser2 className='mr-2 h-4 w-4' />
                        <span>Perfil</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <LucideCreditCard className='mr-2 h-4 w-4' />
                      <span>Billing</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LucideSettings className='mr-2 h-4 w-4' />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LucideKeyboard className='mr-2 h-4 w-4' />
                      <span>Keyboard shortcuts</span>
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <LucideUsers2 className='mr-2 h-4 w-4' />
                      <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <LucideUserPlus2 className='mr-2 h-4 w-4' />
                        <span>Invite users</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <LucideMail className='mr-2 h-4 w-4' />
                            <span>Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <LucideMessageSquare className='mr-2 h-4 w-4' />
                            <span>Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LucidePlusCircle className='mr-2 h-4 w-4' />
                            <span>More...</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      <LucidePlus className='mr-2 h-4 w-4' />
                      <span>New Team</span>
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LucideGithub className='mr-2 h-4 w-4' />
                    <span>GitHub</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LucideLifeBuoy className='mr-2 h-4 w-4' />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <LucideCloud className='mr-2 h-4 w-4' />
                    <span>API</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <LogOut>
                    <DropdownMenuItem>
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Deslogar</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </LogOut>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!session && (
              <div className='flex items-center gap-4'>
                <div className='sm:flex sm:gap-4'>
                  <Link href='/acessar'>
                    <Button className='block px-5 py-2.5 text-sm font-medium text-white transition'>
                      Fazer Login
                    </Button>
                  </Link>
                  <Link href='/cadastrar'>
                    <Button
                      variant='ghost'
                      className='hidden bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition sm:block'
                    >
                      Cadastre-se
                    </Button>
                  </Link>
                </div>

                <button className='block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden'>
                  <span className='sr-only'>Toggle menu</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </StickyScroll>
  );
}