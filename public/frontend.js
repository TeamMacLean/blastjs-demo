var app = React.createClass({
  getInitialState: function getInitialState() {
    return {
      nucls: [],
      prots: [],
      selectedDB: {}
    }
  },
  componentDidMount: function componentDidMount() {
    var self = this;

    $.ajax({
      url: "/dbs",
      context: document.body
    }).done(function (data) {
      data.dbs.map(function (d) {
        if (d.type == 'nin') {
          self.setState({nucls: self.state.nucls.concat([d])});
        }
        if (d.type == 'pin') {
          self.setState({prots: self.state.prots.concat([d])});
        }
      });

      self.setState({
        dbs: data.dbs
      });

      $('#preloader').hide();

    });
  },


  toggleNucl: function checkboxToggle(i) {
    var self = this;
    var current = this.state.nucls[i];
    self.setState({selectedDB: current});
  },
  toggleProts: function checkboxToggle(i) {
    var self = this;
    var current = this.state.prots[i];
    self.setState({selectedDB: current});
  },
  blast: function blast(e) {
    e.preventDefault();
    var self = this;


    var outputDiv = $('#output');

    outputDiv.text('');
    $('#outputWrapper').addClass('hidden');
    $('#blastLoader').removeClass('hidden');

    var obj = {
      db: self.state.selectedDB,
      query: $('#input').val().toString(),
      useString: true
    };

    $.ajax({
      type: "POST",
      url: "/blast",
      data: JSON.stringify(obj),
      contentType: 'application/json'
    }).done(function (data) {


      $('#blastLoader').addClass('hidden');
      $('#outputWrapper').removeClass('hidden');

      if (data.error) {
        $('#output').text(data.error);
      } else {
        $('#output').text(data.output);
      }

      setTimeout(function () {
        outputDiv.height(outputDiv[0].scrollHeight);
      }, 1);

    });
  },
  render: function render() {
    var self = this;
    return (
      <div>
        <h1>Blast.js Example App</h1>
        <form onSubmit={this.blast}>

          <div className="row">
            <div className="col6">
              <fieldset>
                <legend>Prot' DBs</legend>
                {self.state.prots.map(function (object, i) {
                  if (object.type == 'pin') {
                    return <div><input type="radio" name="gender" value={object.name}
                                       onChange={self.toggleProts.bind(object, i)}/> {object.name} <br/></div>
                  }
                })}
              </fieldset>
            </div>
            <div className="col6">
              <fieldset>
                <legend>Nucl' DBs</legend>
                {self.state.nucls.map(function (object, i) {
                  if (object.type == 'nin') {
                    return <div><input type="radio" name="gender" value={object.name}
                                       onChange={self.toggleNucl.bind(object, i)}/> {object.name} <br/></div>
                  }
                })}
              </fieldset>
            </div>
          </div>
          <fieldset>
            <label>Query</label>
            <textarea rows="4" cols="50" id="input" placeholder="TGACTGACTGACTGACTGACTGACTGACTGACTGAC"/>
          </fieldset>

          <fieldset>
            <button className="primary big">BLAST!</button>
          </fieldset>

          <fieldset className="hidden" id="outputWrapper">
            <label>Output</label>
            <textarea id="output" readOnly/>

            <div className="loader hidden" id="blastLoader">Blasting...</div>
          </fieldset>

        </form>
      </div>
    )
  }
});

var out = ReactDOM.render(React.createElement(app, null), document.getElementById('app'));
