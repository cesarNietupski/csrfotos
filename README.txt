CSRFOTOS — SITE ONE PAGE DE FOTOGRAFIA

COMO FUNCIONA AGORA
- O site público lê as informações de forma estática pelo arquivo: config/site-data.json
- Esse JSON contém textos, URLs das imagens, contatos, avaliações, pacotes, álbuns e dados de enquadramento das imagens.
- O painel admin serve para editar essas informações visualmente e gerar um novo arquivo site-data.json.
- O navegador não consegue sobrescrever arquivos do projeto automaticamente por segurança. Por isso, depois de editar no painel, clique em "Baixar site-data.json" e substitua o arquivo dentro da pasta config/.

COMO USAR
1. Publique ou rode o projeto em um servidor estático. Exemplo: VS Code Live Server, GitHub Pages, Netlify ou Vercel.
2. Abra index.html para visualizar o site.
3. Acesse admin/index.html ou clique em "Área administrativa" no rodapé.
4. Use o PIN padrão 1234.
5. Edite textos, imagem principal, álbuns, pacotes, contatos e avaliações.
6. Clique em "Baixar site-data.json".
7. Substitua o arquivo config/site-data.json pelo arquivo baixado.
8. Envie/commite a alteração para a hospedagem.

IMPORTANTE
- Ao abrir index.html diretamente pelo duplo clique no computador, alguns navegadores bloqueiam o carregamento de JSON local via fetch.
- Para testar corretamente, use um servidor local, como a extensão Live Server do VS Code.
- Para imagens, use URLs públicas.

ESTRUTURA PRINCIPAL DO JSON
{
  "texts": "todos os textos do site e imagem principal",
  "contacts": "formas de contato",
  "packages": "pacotes e itens inclusos",
  "testimonials": "avaliações dos clientes",
  "portfolio": "álbuns, capa, URLs das fotos e enquadramento"
}

ENQUADRAMENTO
- No painel admin, em "Textos do site", use Horizontal, Vertical e Zoom para ajustar a imagem principal dentro da máscara.
- Em "Álbuns", use os mesmos controles para ajustar a capa de cada trabalho recente.
- Esses ajustes são salvos no JSON em heroImageFit e coverFit.
