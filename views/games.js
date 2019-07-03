<h1>Title: <%= title %></h1>
<ul class="list-group">
  <% if( typeof games != 'undefined') { %>
    <% games.forEach(function(game) { %>
        <li class="list-group-item row">
          <a href='/game"<%= game.id %>"'> game.title</a>
        </li>
    <% }); %>
  <% } else { %>
      <li>Nothing to see here...</li>
  <% } %>
</ul>
