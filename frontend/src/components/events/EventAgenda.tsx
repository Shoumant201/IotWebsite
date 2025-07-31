'use client';

interface AgendaItem {
    time: string;
    activity: string;
}

interface EventAgendaProps {
    agenda: AgendaItem[];
}

export default function EventAgenda({ agenda }: EventAgendaProps) {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Agenda</h2>
            <div className="space-y-4">
                {agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                        <div className="bg-[#75BF43] text-white px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                            {item.time}
                        </div>
                        <p className="text-gray-700 font-medium">{item.activity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}