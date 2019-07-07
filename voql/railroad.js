// From: https://tabatkins.github.io/railroad-diagrams/generator.html

// First query
var main_query=`Diagram(
    Choice(0,
      NonTerminal('show me'),
      NonTerminal('tell me'),
      NonTerminal('draw')
    ),
    (Comment('the')),
    Optional(NonTerminal('quantity to show')),
    NonTerminal('thing to show'),
    Optional(OneOrMore(NonTerminal('filter'),Comment('and'))),
    Optional(NonTerminal('date range'), 'skip'),
  )`;

  var quantity=`Diagram(
    Comment('quantity'),
    Choice(5, 
      'top', 
      'best',
      'worst',
      'highest',
      'lowest',
      'all',
      'newest',
      'oldest',
      'most',
      'least'
    ),
    Optional(Comment('number of items'))
  )`;

  var dateFilter=`Diagram(
    NonTerminal('for the last'),
    Optional(Comment('number')),
    Choice(0, Choice(0, 'minute','minutes'), 
      Choice(0, 'hour', 'hours'), 
      Choice(0, 'day', 'days'),
      Choice(0, 'week', 'weeks'),
      Choice(0, 'month', 'months'),
      Choice(0, 'quarter', 'quarters'),
      Choice(0, 'year', 'years'),
    )
  )`

  var quantityFilter=`Diagram(
    Choice(0, NonTerminal('above'), NonTerminal('below')),
    Optional(Comment('number')),
    Optional(Terminal('unit'))
  )`

  var entities=`Diagram(
    Choice(0, 
      Choice(0,NonTerminal('orders'),NonTerminal('sales')), 
      NonTerminal('people'),
      NonTerminal('region'),
      NonTerminal('date'),
      NonTerminal('price'),
      NonTerminal('cost'),
      NonTerminal('margin')
    ),
  )




  