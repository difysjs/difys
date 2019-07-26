const ChannelsEnum = {
	/** Le canal global du contexte de jeu (RP ou combat) */
	CHANNEL_GLOBAL: 0,
	/** Le canal de l'équipe dans un combat */
	CHANNEL_TEAM: 1,
	/** Le canal de la guilde */
	CHANNEL_GUILD: 2,
	/** Le canal de l'alliance */
	CHANNEL_ALLIANCE: 3,
	/** Le canal du groupe */
	CHANNEL_PARTY: 4,
	/** Le canal de vente */
	CHANNEL_SALES: 5,
	/** Le canal de recherche */
	CHANNEL_SEEK: 6,
	/** Le canal incarnam */
	CHANNEL_NOOB: 7,
	/** Le canal des modérateurs, MJ et admins */
	CHANNEL_ADMIN: 8,
	/** Le canal promotionnel */
	CHANNEL_ADS: 12,
	/** Le canal du groupe d'arènes JcJ */
	CHANNEL_ARENA: 13,
	/** Les messages privés */
	PSEUDO_CHANNEL_PRIVATE: 9,
	/** Les messages d'informations */
	PSEUDO_CHANNEL_INFO: 10,
	/** Les messages d'événements en combats (utilisé côté client uniquement). */
	PSEUDO_CHANNEL_FIGHT_LOG: 11
};

export default ChannelsEnum;
