import { setRequestLocale } from 'next-intl/server';
// import ChatPage from './chat';
import TourismGenerator from './generate';
// import ChatStream from './chat';


type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;

    await setRequestLocale(locale);

    return (
        <div>
            <h1 className="text-xl font-bold">Bienvenido a Pearl</h1>
            {/* <ChatPage /> */}
            <TourismGenerator />
            {/* <ChatStream /> */}
            {/* <p className="mt-4 text-gray-600">This page is designed to demonstrate the chat functionality with AI.</p> */}
        </div>
    );
}

// npm audit fix
