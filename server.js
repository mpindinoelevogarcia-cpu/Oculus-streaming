const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do Sistema Master da Oculus Streaming
const DONO_MASTER_EMAIL = "mpindinoelevogarcia61@gmail.com";
const DONO_MASTER_PASS = "Mpindi2026@";
const COMERCIAL_WHATSAPP = "244926008439";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base de Dados Relacional Simulada em Memória (Estrutura Real SQL pronta)
let usuarios = [
    { 
        id: 1, 
        nome: "Mestre", 
        apelido: "Mpindi", 
        email: DONO_MASTER_EMAIL, 
        senha: DONO_MASTER_PASS, 
        contacto: COMERCIAL_WHATSAPP,
        status: "ativo", 
        painel: 1, // FUNDADOR SUPREMO
        plano: "Empresarial"
    }
];

let publicacoes = [
    {
        id: 1,
        autor: "Mestre Mpindi",
        texto: "Bem-vindos à Oculus Streaming (Muzik 520)! O feed ativo e os 5 painéis supremos estão operacionais.",
        tipo: "Músicas",
        likes: 12,
        quemGostou: ["Mestre Mpindi"],
        plays: 140,
        downloads: 85
    }
];

// ==========================================
// 1. ROTAS DE AUTENTICAÇÃO E CADASTRO CLÍNICO
// ==========================================

// Rota de Cadastro com Medidor Rigoroso de 11 Caracteres
app.post('/api/auth/signup', (req, res) => {
    const { nome, apelido, contacto, senha, dia, mes, ano, genero } = req.body;

    // TRAVA CRÍTICA DE SENHA DE EXATAMENTE 11 CARACTERES
    if (!senha || senha.length !== 11) {
        return res.status(400).json({ error: "Erro crítico: A palavra-passe exige rigorosamente exatamente 11 caracteres!" });
    }

    // Criar o utilizador com o status "pendente" (Gatilho para o Congelamento Amarelo)
    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        apelido,
        contacto,
        senha,
        nascimento: `${dia}/${mes}/${ano}`,
        genero,
        status: "pendente",
        painel: 3, // Inicia como estúdio padrão
        plano: "Nenhum",
        dataCriacao: new Date()
    };

    usuarios.push(novoUsuario);
    
    // Gera o código OTP randómico de 8 dígitos para validação
    const otpGerado = Math.floor(10000000 + Math.random() * 90000000);

    res.status(201).json({ 
        message: "Cadastro inicial realizado. Aguardando verificação anti-fraude.",
        usuario: novoUsuario,
        otp: otpGerado
    });
});

// ==========================================
// 2. ARQUITETURA DE PERMISSÕES (OS 5 PAINÉIS SUPREMOS)
// ==========================================

// CONTROLO MANUAL DO DONO (BYPASS ROUTING - PAINEL 1)
app.post('/api/admin/bypass-activation', (req, res) => {
    const { adminEmail, adminPass, usuarioId } = req.body;

    if (adminEmail !== DONO_MASTER_EMAIL || adminPass !== DONO_MASTER_PASS) {
        return res.status(403).json({ error: "Acesso negado. Apenas o Dono Master possui permissão total." });
    }

    let user = usuarios.find(u => u.id === parseInt(usuarioId));
    if (!user) return res.status(404).json({ error: "Usuário não encontrado na base de dados." });

    user.status = "ativo"; // Força o status para ativo anulando a necessidade do OTP
    res.json({ message: "Bypass executado! Conta ativada com sucesso sem necessidade de código.", usuario: user });
});

// LISTAGEM LOGS DO PAINEL 2 (EMPRESA / RH)
app.get('/api/empresa/logs', (req, res) => {
    // Retorna o histórico de contas criadas para monitorização do RH
    res.json({
        totalUsuarios: usuarios.length,
        usuariosRegistados: usuarios.map(u => ({ nome: `${u.nome} ${u.apelido}`, contacto: u.contacto, status: u.status }))
    });
});

// ==========================================
// 3. ENGENHARIA DE INTERATIVIDADE E FEED ATIVO
// ==========================================

// Rota do Feed Ativo (Sem links externos - Object-fit Control)
app.get('/api/feed', (req, res) => {
    res.json(publicacoes);
});

// Sistema Avançado de Comentários com Moderação por Chave de Privacidade
app.post('/api/feed/comentar', (req, res) => {
    const { usuarioNome, postId, textoComentario, eAnonimo } = req.body;

    // REGRA DE RECOMPENSA E BLOQUEIO DE COMENTÁRIOS PARA ANÓNIMOS
    if (eAnonimo) {
        return res.status(401).json({ 
            block: true, 
            message: "Deves criar uma conta de ouvinte para participar da conversa ou comentar. Ao criares a tua conta, recebes recompensas de ser um ouvinte ou fã ativo!" 
        });
    }

    // Processa o comentário normalmente na base de dados
    res.json({ message: "Comentário moderado e adicionado com sucesso!", autor: usuarioNome, texto: textoComentario });
});

// Inicialização do Servidor Central
app.listen(PORT, () => {
    console.log(`[OCULUS ENGINE ACTIVE] A rodar na porta ${PORT}`);
});
