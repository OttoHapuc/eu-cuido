import React from 'react';
import FeatureCard from '../../molecules/FeatureCard';
import {
    MdNotificationsActive,
    MdLockOutline,
    MdDevicesOther,
    MdCamera,
} from 'react-icons/md';

const FeaturesSection: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-text-color mb-12">
                    Vantagens Exclusivas do Nosso Aplicativo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<MdNotificationsActive />}
                        title="Notificações Inteligentes"
                        description="Sem problemas em cancelamentos de última hora com nosso sistema é inteligente e solicita profissionais disponíveis."
                    />
                    <FeatureCard
                        icon={<MdLockOutline />}
                        title="Segurança no Pagamento"
                        description="Pagamentos seguros e criteriosos, garantindo tranquilidade para todos."
                    />
                    <FeatureCard
                        icon={<MdDevicesOther />}
                        title="Monitoramento em Tempo Real"
                        description="Acompanhe as condições do idoso com nosso dispositivo integrado."
                    />
                    <FeatureCard
                        icon={<MdCamera />}
                        title="Integração com Câmeras"
                        description="Acompanhe a rotina através de um sistema de câmeras integrado para maior segurança."
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
