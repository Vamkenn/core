import AssetType				= require("awayjs-core/lib/library/AssetType");
import IAsset					= require("awayjs-core/lib/library/IAsset");
import NamedAssetBase			= require("awayjs-core/lib/library/NamedAssetBase");
import ITextureData				= require("awayjs-core/lib/pool/ITextureData");

/**
 *
 */
class TextureProxyBase extends NamedAssetBase implements IAsset
{
	public _pSize:number;
	public _pFormat:string = "bgra"
	private _textureData:Array<ITextureData> = new Array<ITextureData>();
	
	/**
	 *
	 */
	constructor(generateMipmaps:boolean = false)
	{
		super();
	}

	public get size():number
	{
		return this._pSize;
	}

	/**
	 *
	 * @returns {string}
	 */
	public get format():string
	{
		return this._pFormat;
	}

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return AssetType.TEXTURE;
	}

	/**
	 *
	 */
	public invalidateContent():void
	{
		var len:number = this._textureData.length
		for (var i:number = 0; i < len; i++)
			this._textureData[i].invalidate();
	}

	/**
	 *
	 * @private
	 */
	public invalidateSize():void
	{
		while (this._textureData.length)
			this._textureData[0].dispose();
	}

	/**
	 * @inheritDoc
	 */
	public dispose()
	{
		while (this._textureData.length)
			this._textureData[0].dispose();
	}


	public _iAddTextureData(textureData:ITextureData):ITextureData
	{
		this._textureData.push(textureData);

		return textureData;
	}

	public _iRemoveTextureData(textureData:ITextureData):ITextureData
	{
		this._textureData.splice(this._textureData.indexOf(textureData), 1);

		return textureData;
	}
}

export = TextureProxyBase;