SITE ONE PAGE DE FOTOGRAFIA

Arquivos principais:
- index.html: página pública do site.
- styles.css: estilos da página pública.
- script.js: funcionamento da página pública.
- data.js: dados iniciais do site.
- admin/index.html: painel administrativo.
- admin/admin.css: estilos do painel.
- admin/admin.js: funcionamento do painel.

Como usar:
1. Abra o arquivo index.html no navegador para ver o site.
2. No rodapé, clique em "Área administrativa" ou abra admin/index.html.
3. Use o PIN 1234.
4. Altere pacotes, contatos, avaliações e fotos do portfólio.
5. As alterações ficam salvas no navegador usando localStorage.

Importante:
- Este projeto é estático, feito com HTML, CSS e JavaScript puro.
- Não precisa de banco de dados.
- Para hospedar, envie todos os arquivos para sua hospedagem.
- O painel salva dados no navegador. Para levar os dados para outro computador, use Exportar dados e depois Importar dados.
- Para mudar o PIN, edite a variável ADMIN_PIN no arquivo admin/admin.js.

Fotos no portfólio:
- Use uma URL pública da imagem.
- Para Google Drive, o arquivo precisa estar compartilhado publicamente.
- Em muitos casos, links diretos de imagem funcionam melhor em serviços como Cloudinary, Imgur ou hospedagem própria.
