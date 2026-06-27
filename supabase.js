// Configuração de conexão do Oculus Streaming com o Supabase
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "sb_publishable_YLYSpSWDa6-h0Fsihf0tuw_iKZdCMwXmKxP0b_K88_3Rsmb1K5-PZ_g"; 

// Inicializa o Supabase no site
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
