// Configuração de conexão do Oculus Streaming com o Supabase
const SUPABASE_URL = "Cole_Aqui_O_Seu_Project_URL";
const SUPABASE_KEY = "sb_publishable_YLYSpSWDa6-h0Fsihf0tuw_iKZdCM..."; // Clique no botão copiar ao lado da Publishable key e cole aqui tudo

// Inicializa o Supabase no site
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
