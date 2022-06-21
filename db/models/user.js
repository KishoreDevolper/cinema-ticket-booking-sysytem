const {Model} = require('objection');

class user extends Model {
    static get tableName(){
        return 'user'
  }

   
    static get relationMappings(){
        const Screen_Gold_Morning = require('./gold_morning')
        const Screen_Gold_Afternoon = require('./gold_afternoon')
        const Screen_Gold_Night = require('./gold_night')
        const Screen_Silver_Morning = require('./silver_morning')
        const Screen_Silver_Afternoon = require('./silver.afternoon')
        const Screen_Silver_Night = require('./silver_night')
        return {
            Screen_Gold_Morning:{
                relation:Model.HasManyRelation,
                modelClass:Screen_Gold_Morning,
                join:{
                    from:'Screen_Gold_Morning.Gold_users',
                    to:'user.id'
                }
            },
            Screen_Gold_Afternoon:{
                            relation:Model.HasManyRelation,
                            modelClass:Screen_Gold_Afternoon,
                            join:{
                                from:'user.id',
                                to:'Screen_Gold_Afternoon.Gold_users'
                            }
                        },
            Screen_Gold_Night:{
                            relation:Model.HasManyRelation,
                            modelClass:Screen_Gold_Night,
                            join:{
                                from:'user.id',
                                to:'Screen_Gold_Night.Gold_users'
                            }
                        },
            Screen_Silver_Morning:{
                            relation:Model.HasManyRelation,
                            modelClass:Screen_Silver_Morning,
                            join:{
                                from:'user.id',
                                to:'Screen_Silver_Morning.Gold_users'
                            }
                        },
           Screen_Silver_Afternoon:{
                            relation:Model.HasManyRelation,
                            modelClass:Screen_Silver_Afternoon,
                            join:{
                                from:'user.id',
                                to:'Screen_Silver_Afternoon.Gold_users'
                            }
                        },
           Screen_Silver_Night:{
                            relation:Model.HasManyRelation,
                            modelClass:Screen_Silver_Night,
                            join:{
                                from:'user.id',
                                to:'Screen_Silver_Night.Gold_users'
                            }
                        }
            
            
        }
    }
    
} 

module.exports = user