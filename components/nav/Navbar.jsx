import Link from 'next/link'
import Image from 'next/image';

import { Button } from '../ui/button'

import logo from '@/public/images/logo.png';

export default function Navbar() {
    return (
        <nav className='relative w-[calc(100%-32px)] mx-auto py-6 z-10 flex items-center justify-between'>
            <div>
                <Link href={'/'}>
                    <Image src={logo} alt='logo' height='auto' />
                </Link>
            </div>
            <div>
                <Link href={'/unlock'}>
                    <Button
                        className='shadow-sm'
                        variant="white">
                        🔓 Unlock Now
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
