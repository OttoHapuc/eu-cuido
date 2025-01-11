const mockCuidadores = [
    {
        id: 1,
        nome: 'Ana Silva',
        foto: 'https://randomuser.me/api/portraits/women/1.jpg',
        classificacao: 4.5,
        atendimentos: 25,
        genero: 'Feminino',
        atendimentosConhecidos: ['acompanhamento', 'cuidados_especiais'],
        availability: [],
    },
    {
        id: 2,
        nome: 'Carlos Souza',
        foto: 'https://randomuser.me/api/portraits/men/2.jpg',
        classificacao: 4.8,
        atendimentos: 30,
        genero: 'Masculino',
        atendimentosConhecidos: ['acompanhamento'],
        availability: [],
    },
    {
        id: 3,
        nome: 'Mariana Oliveira',
        foto: 'https://randomuser.me/api/portraits/women/3.jpg',
        classificacao: 4.2,
        atendimentos: 18,
        genero: 'Feminino',
        atendimentosConhecidos: ['cuidados_especiais'],
        availability: [
            {
                id: 301,
                day: '2024-12-01',
                startTime: '11:00',
                endTime: '12:00',
                status: 'disponivel',
            },
            {
                id: 302,
                day: '2024-12-02',
                startTime: '09:00',
                endTime: '10:00',
                status: 'agendado',
            },
            {
                id: 303,
                day: '2024-12-02',
                startTime: '14:00',
                endTime: '15:00',
                status: 'disponivel',
            },
        ],
    },
];

export default mockCuidadores;
