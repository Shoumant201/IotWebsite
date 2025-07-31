import { TeamMember } from '@/lib/api';

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
        <p className="text-gray-600 text-xs leading-relaxed flex-grow mb-4">
          {member.description}
        </p>
        
        {/* Social Links */}
        {member.social_links && Object.keys(member.social_links).filter(key => member.social_links[key as keyof typeof member.social_links]).length > 0 && (
          <div className="flex justify-center space-x-3 mt-auto">
            {member.social_links.linkedin && (
              <a
                href={member.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {member.social_links.twitter && (
              <a
                href={member.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                title="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            )}
            {member.social_links.github && (
              <a
                href={member.social_links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {member.social_links.email && (
              <a
                href={`mailto:${member.social_links.email}`}
                className="text-gray-400 hover:text-green-600 transition-colors duration-200"
                title="Email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}