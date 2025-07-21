interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  description: string;
}

interface TeamCardProps {
  member: TeamMember;
  isLeader?: boolean;
}

export default function TeamCard({ member, isLeader = false }: TeamCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
      <div className={`${isLeader ? 'w-24 h-24' : 'w-20 h-20'} mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#75BF43] to-[#5a9f33] flex items-center justify-center flex-shrink-0`}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span class="text-white ${isLeader ? 'text-xl' : 'text-lg'} font-bold">${member.name.split(' ').map((n: string) => n[0]).join('')}</span>`;
              }
            }}
          />
        ) : (
          <span className={`text-white ${isLeader ? 'text-xl' : 'text-lg'} font-bold`}>
            {member.name.split(' ').map((n: string) => n[0]).join('')}
          </span>
        )}
      </div>
      
      <div className="flex flex-col flex-grow text-center">
        <h4 className={`${isLeader ? 'text-xl' : 'text-lg'} font-bold text-gray-900 mb-2`}>
          {member.name}
        </h4>
        <p className="text-[#75BF43] mb-1 font-semibold text-sm">
          {member.role}
        </p>
        <p className="text-gray-500 mb-3 text-xs">
          {member.department}
        </p>
        <p className="text-gray-600 text-xs leading-relaxed flex-grow">
          {member.description}
        </p>
      </div>
    </div>
  );
}