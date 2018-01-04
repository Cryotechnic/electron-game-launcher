import React, {Component} from 'react'
import GamesGrid from './components/GamesGrid.jsx'
import UILayer from './ui/Layer.jsx'
import UIList from './ui/List.jsx'
import UIItem from './ui/Item.jsx'
import UINavigation from './ui/Navigation.jsx'
import UIInput from './ui/Input.jsx'

let fs = require('fs');

let db = JSON.parse(fs.readFileSync('./apps.json', 'utf8'));

let sortedApps = db.sort(function(a, b) {
    var textA = a.name.toLowerCase();
    var textB = b.name.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});


export default class App extends Component {

    constructor(props) {
    super(props);
    
    global.UI = new UINavigation();
    global.Input = new UIInput();

    // Build Items
    let items = [];
    let items2 = [];
    let items3 = [];

    

    sortedApps.forEach(function(element) {
        let newItem = new UIItem( global.Input.RunGame );
        newItem.meta = element;
        items.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.meta = element;
        items2.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.meta = element;
        items3.push(newItem);
    }, this);

    // Build List w/ Items

    let allList = new UIList(items, "All Games", 3);
    let recentList = new UIList([items2[8], items2[12], items2[21]], "Recently Played", 3);
    let favoritesList = new UIList([items3[7], items3[16], items3[22], items3[27], items3[23]], "Favorites", 3);

    let lists = [favoritesList, recentList, allList];

    // Build Layer w/ List
    let layer = global.UI.NewCacheLayer(lists, "Layer Title");
    global.UI.NewLayer(layer);

    this.state = { "lists":lists };

    global.AppJS = this;


  }



  


    render() {

        global.UI.MainView = this.refs.MainView;
        
        return (
            <main>
                
                <div id="sidebar">
                    <div className="view">
                    </div>
                </div>
                <div id="main" ref="MainView">
                    <div className="view">
                        <div className="logo-top"><img src="./images/logo-white.png" /></div>    
                        <GamesGrid list={this.state.lists[0]} />
                        <GamesGrid list={this.state.lists[1]} />
                        <GamesGrid list={this.state.lists[2]} />
                    </div>
                </div>
            </main>
        )
    }
}
