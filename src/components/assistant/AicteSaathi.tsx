import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Languages, 
  Bot, 
  User, 
  MessageSquare, 
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AicteSaathiProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AicteSaathi: React.FC<AicteSaathiProps> = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: language === 'en'
        ? "Namaste! I am AICTE Saathi, your official NEP 2020 & TrueRoll digital assistant. I can guide you through APAAR ID generation, DigiLocker ABC credit sync, anti-seat hoarding rules, or registrar batch upload errors. How may I assist you today?"
        : "नमस्ते! मैं एआईसीटीई साथी (AICTE Saathi) हूँ, आपका आधिकारिक एनईपी 2020 एवं TrueRoll डिजिटल सहायक। मैं अपार (APAAR) आईडी, डिजिलॉकर क्रेडिट सिंक, या सीट आवंटन त्रुटियों को हल करने में आपकी सहायता कर सकता हूँ।",
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = language === 'en' ? [
    {
      label: 'How does Anti-Seat Hoarding work?',
      q: 'How does the TrueRoll Anti-Seat Hoarding Concurrency Shield protect admission seats?'
    },
    {
      label: 'Locate lost APAAR ID',
      q: 'How does a student locate or regenerate a missing 12-digit APAAR ID?'
    },
    {
      label: 'Fix Quota Over-Capacity Error',
      q: 'Why did the Python Rules Engine flag an over-capacity error in our batch upload?'
    },
    {
      label: 'DPDP Act 2023 Consent Tokens',
      q: 'What rights do students have under the DPDP Act 2023 for credential verification?'
    }
  ] : [
    {
      label: 'एंटी-सीट होर्डिंग कैसे काम करता है?',
      q: 'TrueRoll की एंटी-सीट होर्डिंग शील्ड दोहरे प्रवेश को कैसे रोकती है?'
    },
    {
      label: 'खोया अपार आईडी कैसे खोजें?',
      q: 'छात्र अपनी 12-अंकीय अपार (APAAR) आईडी कैसे प्राप्त या पुनः प्राप्त कर सकते हैं?'
    },
    {
      label: 'कोटा ओवर-कैपेसिटी त्रुटि सुधार',
      q: 'बैच अपलोड में स्वीकृत सीट सीमा पार होने की त्रुटि कैसे हल करें?'
    },
    {
      label: 'DPDP डेटा गोपनीयता अधिकार',
      q: 'DPDP अधिनियम 2023 के तहत छात्र के डेटा साझाकरण पर क्या नियंत्रण है?'
    }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('hoarding') || lower.includes('concurrency') || lower.includes('होर्डिंग')) {
        reply = language === 'en'
          ? "The TrueRoll Anti-Seat Hoarding Shield enforces a real-time atomic database constraint on (apaar_id, academic_year). If a candidate accepts an admission offer at Institute A and attempts to confirm a second seat at Institute B, Institute B's registrar receives an instant collision block. The student has 48 hours to execute a DigiLocker-verified Transfer NOC, releasing the abandoned seat to waiting list candidates!"
          : "TrueRoll एंटी-सीट होर्डिंग शील्ड (apaar_id, academic_year) पर एक वास्तविक समय राष्ट्रीय डिजिटल लॉक लागू करती है। यदि कोई छात्र एक साथ दो संस्थानों में प्रवेश लेता है, तो प्रणाली तुरंत अलर्ट जारी करती है और 48 घंटे में वैध ट्रांसफर एनओसी (NOC) न मिलने पर दोहरा प्रवेश स्वतः रद्द कर देती है।";
      } else if (lower.includes('lost') || lower.includes('locate') || lower.includes('खोया') || lower.includes('apaar id')) {
        reply = language === 'en'
          ? "Students can retrieve their APAAR ID instantly by authenticating through DigiLocker with their Aadhaar-linked mobile OTP or UDISE+ Permanent Education Number (PEN). In TrueRoll, head over to the 'Student Vault' tab to inspect your live Virtual APAAR ID Card and digital credentials."
          : "छात्र अपने आधार से जुड़े मोबाइल नंबर या UDISE+ स्थायी शिक्षा संख्या (PEN) के माध्यम से डिजिलॉकर में लॉग इन करके तुरंत अपनी 12-अंकीय अपार (APAAR) आईडी प्राप्त कर सकते हैं। आप 'Student Vault' में अपना लाइव वर्चुअल कार्ड भी देख सकते हैं।";
      } else if (lower.includes('quota') || lower.includes('over-capacity') || lower.includes('कोटा')) {
        reply = language === 'en'
          ? "Under AICTE Approval Process Handbook guidelines, colleges cannot exceed the sanctioned intake cap for any branch (e.g. 120 seats for AI&DS). When your CSV exceeds this, the Python Quota Guard blocks enrollment until excess admissions are reassigned to vacant branches or formal supernumerary approvals are granted by AICTE."
          : "एआईसीटीई नियमों के अनुसार, कॉलेज किसी भी शाखा की स्वीकृत सीट सीमा (जैसे 120 सीट) से अधिक प्रवेश नहीं दे सकते। अतिरिक्त छात्रों को रिक्त शाखाओं में स्थानांतरित करना होगा या एआईसीटीई से विशेष अनुमति लेनी होगी।";
      } else if (lower.includes('dpdp') || lower.includes('consent') || lower.includes('गोपनीयता')) {
        reply = language === 'en'
          ? "Under the Digital Personal Data Protection (DPDP) Act 2023, TrueRoll gives students granular control. You can issue ephemeral, time-bound verification tokens (e.g. valid for 7 days only) specifying which data fields an employer can see, and you can revoke access anytime with zero latency!"
          : "डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम 2023 के तहत, छात्र को अपने डेटा पर पूर्ण नियंत्रण प्राप्त है। आप सीमित समय (जैसे 7 दिन) के लिए टोकन जारी कर सकते हैं और कभी भी 1-क्लिक में एक्सेस वापस ले सकते हैं।";
      } else {
        reply = language === 'en'
          ? "Thank you for your inquiry. TrueRoll seamlessly integrates MoE APAAR, DigiLocker Academic Bank of Credits (ABC), and AICTE seat compliance. You can use the top navigation to switch between the Registrar, Student, AICTE Regulator, or Employer Verifier portals to explore these live features."
          : "आपके प्रश्न के लिए धन्यवाद। TrueRoll मंच एआईसीटीई के सभी दिशा-निर्देशों, अपार आईडी तथा डिजीलॉकर क्रेडिट्स का संपूर्ण समन्वय करता है। आप शीर्ष नेविगेशन का उपयोग करके विभिन्न पोर्टल देख सकते हैं।";
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all">
      {/* Header */}
      <div className="bg-[#0A192F] text-white p-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold flex items-center gap-1.5">
              AICTE Saathi Assistant
              <span className="text-[9px] font-normal px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                AI
              </span>
            </h3>
            <span className="text-[10px] text-slate-400">
              {language === 'en' ? 'NEP 2020 & APAAR Support' : 'एनईपी 2020 एवं अपार सहायता'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Language Toggle */}
          <button
            onClick={() => {
              const next = language === 'en' ? 'hi' : 'en';
              setLanguage(next);
              setMessages(prev => [
                ...prev,
                {
                  sender: 'assistant',
                  text: next === 'hi'
                    ? 'भाषा हिन्दी में बदली गई। आप अपार आईडी या सीट आवंटन पर कोई भी प्रश्न पूछ सकते हैं।'
                    : 'Language switched to English. How can I assist you with TrueRoll or AICTE protocols?',
                  timestamp: 'Just now'
                }
              ]);
            }}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold cursor-pointer"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3 h-3" />
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-3.5 space-y-3 overflow-y-auto max-h-80 min-h-64 text-xs bg-slate-50 dark:bg-[#07111E]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`p-2.5 rounded-xl max-w-[82%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-white rounded-br-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-bl-xs shadow-xs'
              }`}
            >
              {m.text}
              <div
                className={`text-[9px] mt-1 text-right ${
                  m.sender === 'user' ? 'text-amber-100' : 'text-slate-400'
                }`}
              >
                {m.timestamp}
              </div>
            </div>

            {m.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-2 bg-white dark:bg-[#0B1728] border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px]">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.q)}
            className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white dark:bg-[#0B1728] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          placeholder={language === 'en' ? 'Ask AICTE Saathi anything...' : 'एआईसीटीई साथी से पूछें...'}
          className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
        <button
          onClick={() => handleSendMessage()}
          className="p-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-xs cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
